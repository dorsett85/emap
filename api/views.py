from django.http import JsonResponse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .Classes.QueryHelper import QueryHelper


def get_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    if request.user.is_active and request.user is not 'AnonymousUser':
        return JsonResponse({'id': request.user.id, 'name': request.user.username})
    else:
        return JsonResponse({'id': None, 'name': None})


def login_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
    if user is not None:
        login(request=request, user=user)
        return JsonResponse({'id': user.id, 'name': user.username})
    else:
        return JsonResponse({'invalid': 'Invalid username or password'})


def register_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # Check if user exists
    username = request.POST.get('username')
    password = request.POST.get('password')
    qh = QueryHelper('SELECT * FROM auth_user WHERE username = %s', [username]).fetchall()

    if qh.rows:
        return JsonResponse({'invalid': 'Username already exists'})

    # Create, authenticate and login user
    User.objects.create_user(username=username, password=password)
    user = authenticate(username=username, password=password)
    login(request, user=user)
    return JsonResponse({'id': user.id, 'name': user.username})


def logout_user(request):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    logout(request)
    return JsonResponse({'id': None, 'name': None}, safe=False)


def get_games(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # Check which games to return based on user
    if user_id == 'null':
        # TODO restrict game access to non-registered users
        qh = QueryHelper(
            '''
            SELECT id, name, title, description, num_answers, difficulty 
            FROM api_game
            '''
        ).fetchall_array()
    else:
        qh = QueryHelper(
            '''
            SELECT ag.id, ag.name, ag.title, ag.description, ag.num_answers, ag.difficulty
            FROM api_game AS ag
            WHERE ag.id IN (
                SELECT aug.game_id
                FROM api_user_game AS aug
                    INNER JOIN auth_user au on aug.user_id = au.id
                WHERE au.id = '%s'
            )
            ''', [user_id]
        ).fetchall_array()

    if qh.results:
        return JsonResponse(qh.results, safe=False)
    else:
        return JsonResponse('', safe=False)


def get_last_played(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # If a user is logged in, get their last game
    if user_id != 'null':
        qh = QueryHelper(
            '''
            SELECT ag.id, ag.name, ag.title, ag.description, ag.num_answers, ag.difficulty
            FROM api_game as ag
            WHERE ag.id = (
                SELECT aug.game_id 
                FROM api_user_game AS aug
                WHERE aug.user_id = %s and aug.last_played = true
            )
            ''', [user_id]
        ).fetchall_dict()

        if qh.results:
            return JsonResponse(qh.results)
        else:
            return JsonResponse('', safe=False)

    else:
        return JsonResponse('', safe=False)


def set_last_played(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    # If a user is logged in, set their last game
    if user_id != 'null':
        QueryHelper(
            '''
            UPDATE api_user_game SET last_played = false
            WHERE user_id = %(user_id)s;
            
            UPDATE api_user_game SET last_played = true
            WHERE user_id = %(user_id)s and game_id = %(game_id)s;
            ''', {'user_id': user_id, 'game_id': request.POST.get('gameId')}
        )

    return JsonResponse('', safe=False)


def game_guess(request, user_id):
    if not request.is_ajax():
        return HttpResponse('Must be an ajax request')

    request_dict = {
        'user_id': user_id,
        'game_id': request.POST.get('gameId'),
        'game_name': request.POST.get('gameName'),
        'guess': request.POST.get('guess').lower()
    }

    if request_dict['game_name'] == 'cityPopTop10':
        qh = QueryHelper(
            '''
            SELECT lower(ac.name) AS name, auga.answer_id
            FROM api_city AS ac
                LEFT JOIN api_user_game_answer AS auga
                ON ac.id = auga.answer_id
            ORDER BY ac.population DESC
            LIMIT 10            
            ''', request_dict
        ).fetchall_array()

    if request_dict['guess'] in [row['name'] for row in qh.results]:
        if next(row['answer_id'] for row in qh.results if row['name'] == request_dict['guess']) is None:
            qh = QueryHelper(
                '''
                -- Add guess to the answers table
                INSERT INTO api_user_game_answer(user_id, answer_id, game_id)
                VALUES (
                    %(user_id)s, 
                    (
                        SELECT id
                        FROM api_city
                        WHERE lower(name) = %(guess)s
                    ), 
                    %(game_id)s
                );
                
                -- Return the progress of the users game
                SELECT ac.name, ac.lat, ac.lon, ac.country, ac.population
                FROM api_city as ac
                    INNER JOIN (
                        SELECT answer_id
                        FROM api_user_game_answer as auga
                        WHERE auga.game_id = %(game_id)s AND auga.user_id = %(user_id)s
                    ) AS auga2
                    ON ac.id = auga2.answer_id
                ''', request_dict
            ).fetchall_array()

    # Query the database
    qh = QueryHelper(
        '''
        SELECT name, lat, lon, country, population 
        FROM api_city 
        WHERE lower(name) = %s
        ''', [request_dict['guess'].lower()]
    ).fetchall_dict()

    if qh.results:
        return JsonResponse(qh.results)
    else:
        return JsonResponse('', safe=False)

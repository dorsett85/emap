import os
import sys
sys.path.append(os.getcwd())
from api.Classes.QueryHelper import QueryHelper as QH

"""
This script will add any new migrations to the default app database connection
*** Must be called from the emap base directory ***
"""

# Add database connection settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emap.settings')

# Get the migration list
qh = QH('SELECT file, migrated FROM api_migration').fetchall_array()

# Get all of the migration files
path = os.path.abspath(f'{os.getcwd()}/api/database/migrations')
files = [os.path.join(path, file) for file in os.listdir(path) if file.endswith('.sql')]


# Function to add migration to table
def add_migration(file_path, new):
    file_name = os.path.basename(file_path)
    QH(open(file).read())
    if new:
        QH('''
            INSERT INTO api_migration (file, migrated)
            VALUES (%s, TRUE)
        ''', [file_name])
    else:
        QH('''
            UPDATE api_migration set migrated = true
            WHERE file = %s
        ''', [file_name])
    print(f'{file_name} successfully migrated')


# Run the migration files if they aren't in the migration table
new_migrations = False
print('')
for file in files:
    if qh:
        not_migrated = [row['file'] for row in qh if row['file'] == os.path.basename(file) and not row['migrated']]
        not_in_table = os.path.basename(file) not in [row['file'] for row in qh]
        if not_migrated or not_in_table:
            add_migration(file, not_in_table)
            new_migrations = True
    else:
        add_migration(file, True)
        new_migrations = True

if not new_migrations:
    print('Migrations are up to date!')
print('')

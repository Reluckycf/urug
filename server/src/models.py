from peewee import PostgresqlDatabase, Model, AutoField, CharField, IntegerField, ForeignKeyField
import os
from urllib.parse import urlparse

# --- Database ---
db_url = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/random_words")
parsed_url = urlparse(db_url)

db = PostgresqlDatabase(
    parsed_url.path.lstrip('/'),
    host=parsed_url.hostname,
    port=parsed_url.port or 5432,
    user=parsed_url.username,
    password=parsed_url.password,
)

class Size(Model):
    id = AutoField()
    size = IntegerField()

    class Meta:
        database = db
        table_name = "sizes"

class Word(Model):
    id = AutoField()
    text = CharField(unique=True)
    size = ForeignKeyField(Size, backref="words", on_delete="CASCADE")

    class Meta:
        database = db
        table_name = "words"

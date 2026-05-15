import src.config
from contextlib import asynccontextmanager
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.models import db, Word, Size
from peewee import chunked



@asynccontextmanager
async def lifespan(app: FastAPI):
    db.connect(reuse_if_open=True)
    db.create_tables([Word, Size], safe=True)

    if Word.select().count() == 0:
        with open(r"words.txt", "r", encoding="utf-8") as file:
            words_set = {line.strip() for line in file if line.strip()}

        unique_sizes = {len(w) for w in words_set}
        size_data = [{"size": s} for s in unique_sizes]
        
        with db.atomic():
            for batch in chunked(size_data, 500):
                Size.insert_many(batch).on_conflict_ignore().execute()

        size_mapping = {s.size: s.id for s in Size.select(Size.id, Size.size)}

        word_data = [
            {"text": word, "size": size_mapping[len(word)]} 
            for word in words_set
        ]


        with db.atomic():
            for batch in chunked(word_data, 500):
                Word.insert_many(batch).on_conflict_ignore().execute()
    yield
    if not db.is_closed():
        db.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # your frontend URL
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

class WordObj(BaseModel):
    text: str
    size: int

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/words", response_model=list[WordObj])
def get_random_word(length: int = Query(default=None, ge=1, le=25), words: int = 1):
    query = Word.select(Word.text, Word.size.size).join(Size)
    if length:
        query = query.where(Word.size.size == length)
    query = query.order_by(db.random()).limit(words).dicts()
    return list(query)
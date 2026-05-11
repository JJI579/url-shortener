from fastapi import FastAPI, APIRouter, Request, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from pydantic import HttpUrl, BaseModel
# lifespan
from contextlib import asynccontextmanager
# database
from database import init_db, init_db_sync, close_db, get_session, AsyncSession
from models import Link
from sqlmodel import select, update

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db_sync()
    await init_db()
    yield
    await close_db()

app = FastAPI(lifespan=lifespan)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

linkRouter = APIRouter(
    prefix="/link"
)




class LinkProvided(BaseModel):
    url: HttpUrl

letterChoices = list("ABCDEFGHIJKLMNOPQRSTUVWXYZ")
letterChoices.extend([x.lower() for x in letterChoices])

import random

def generateRandomCode() -> str:
    return ''.join(random.choices(letterChoices, k=4))

@linkRouter.post('/shorten')
async def createRoute(data: LinkProvided, request: Request, session: AsyncSession = Depends(get_session) ):
    # already validated it is a url
    # save to database
    url = str(data.url)
    potentialResp = await session.execute(select(Link).where(Link.linkURL == url))
    potentialURL = potentialResp.scalar_one_or_none()
    if potentialURL:
        return {
            "url": f"{request.base_url}link/{potentialURL.linkCode}"
        }
    
    
    code = generateRandomCode()
    while True:
        linkResp = await session.execute(select(Link).where(Link.linkCode == code))
        if not linkResp.scalar_one_or_none():
            break
        else:
            code = generateRandomCode()
    
    obj = Link(linkURL=url, linkCode=code)
    session.add(obj)
    await session.commit()
    return {
        "url": f"{request.base_url}link/{code}"
    }

@linkRouter.get('/{code}')
async def redirect_code(code: str, session: AsyncSession = Depends(get_session)):
    print(code)
    resp = await session.execute(select(Link).where(Link.linkCode == code))
    redirectURL = resp.scalar_one_or_none()
    if not redirectURL:
        return HTTPException(status_code=404, detail="Not Found")
    return RedirectResponse(url=redirectURL.linkURL)


app.include_router(linkRouter)
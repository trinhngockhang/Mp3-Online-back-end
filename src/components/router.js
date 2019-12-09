import AuthRouter from './Auth/AuthRouter';
import DefaultRouter from './Default/DefaultRouter';
import SongRouter from './Songs/SongRouter';
import ArtistRouter from './Artist/ArtistRouter';
import AlbumRouter from './Albums/AlbumRouter';
import CategoriesRouter from './Categories/CategoryRouter';
import SearchRouter from './Search/SearchRouter';
import UserRouter from './Users/UserRouter';
import UserAdminRouter from './Admin/Users/UserRouter';
import SongAdminRouter from './Admin/Songs/SongRouter';
import SingerAdminRouter from './Admin/Singers/SingerRouter';

export default [
  UserRouter,
  SingerAdminRouter,
  SongAdminRouter,
  UserAdminRouter,
  SearchRouter,
  CategoriesRouter,
  AlbumRouter,
  ArtistRouter,
  SongRouter,
  AuthRouter,
  DefaultRouter,
];

import App from '@/app';

import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import NotFoundRoute from '@routes/not-found.route';
import SongsRoute from '@routes/songs.route';

const app = new App([new IndexRoute(), new SongsRoute(), new AuthRoute(), new NotFoundRoute()]);

app.listen();

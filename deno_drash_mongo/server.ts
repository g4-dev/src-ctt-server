import Drash from "drash";
import { app } from './app.ts';

new Drash.Http.Server(app).run();

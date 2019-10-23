import { RouterComponent } from "babel-skeleton";
import { AppComponent } from "./app/app.component";
import { LoaderComponent } from "./app/loader/loader.component";
import { SquareListComponent } from "./app/squares/square-list/square-list.component";
import { ErrorComponent } from "./app/error/error.component";

(run => window.cordova
    ? window.document.addEventListener("deviceready", run, false)
    : window.addEventListener("load", run, false)
)(() => RouterComponent
    .add("/", "loader", LoaderComponent)
    .add("/squares", "square-list", SquareListComponent)
    .add("/error", "error", ErrorComponent)
    .run(new AppComponent)
);

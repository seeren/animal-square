import { RouterComponent } from "babel-skeleton";

import { AppComponent } from "./app/app.component";
import { LoaderComponent } from "./app/loader/loader.component";
import { SquareListComponent } from "./app/square-list/square-list.component";
import { SquarePuzzleComponent } from "./app/square-puzzle/square-puzzle.component";
import { ErrorComponent } from "./app/error/error.component";
import { ErrorService } from "./app/error/error.service";
import { RankingComponent } from "./app/ranking/ranking.component";

(run => window.cordova
    ? window.document.addEventListener("deviceready", run, false)
    : window.addEventListener("load", run, false)
)(() => {
    try {
        RouterComponent
            .add("/", "loader", LoaderComponent)
            .add("/error", "error", ErrorComponent)
            .add("/squares", "square-list", SquareListComponent)
            .add("/squares/:id", "square-puzzle", SquarePuzzleComponent)
            .add("/ranking", "ranking", RankingComponent)
            .run(new AppComponent)
    } catch (error) {
        ErrorService.set(error);
    }
});

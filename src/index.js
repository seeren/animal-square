import { AppComponent } from "./app/app.component";
import { RouterComponent } from "babel-skeleton";
import { LoaderComponent } from "./app/loader/loader.component";
import { SquareListComponent } from "./app/squares/square-list/square-list.component";

window.onload = () => {
    RouterComponent
        .add("/", "loader", LoaderComponent)
        .add("/squares", "square-list", SquareListComponent)
        .run(new AppComponent)
}

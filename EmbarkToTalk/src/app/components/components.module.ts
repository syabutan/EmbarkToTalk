import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FooterPage } from "./footer/footer.page";

@NgModule({
    declarations: [FooterPage],
    exports: [FooterPage],
    imports: [CommonModule]
})
export class ComponentsModule{}
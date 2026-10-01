import { Component, input } from "@angular/core";
@Component({
  standalone: true,
  selector: "ly-icon",
  templateUrl: "./icon.component.html",
  styleUrl: "./icon.component.css",
})
export class IconComponent {
  name = input("grid");
  paths: Record<string, string> = {
    drop: "M12 3C9 8 5 12 5 16a7 7 0 0014 0c0-4-4-8-7-13Z M8 16a4 4 0 004 4",
    grid: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z",
    bag: "M4 7h16l1 14H3L4 7Z M8 7V5a4 4 0 018 0v2",
    users:
      "M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2 M9 3a4 4 0 110 8 4 4 0 010-8 M17 4a4 4 0 010 7 M22 21v-2a4 4 0 00-3-3.8",
    calendar: "M4 5h16v16H4z M8 3v4 M16 3v4 M4 10h16 M8 14h2 M14 14h2 M8 17h2",
    card: "M3 5h18v14H3z M3 10h18 M7 15h4",
    chart: "M4 3v18h17 M8 16v-4 M13 16V8 M18 16V5",
    shirt: "M8 3l4 2 4-2 6 5-4 4-2-2v11H8V10l-2 2-4-4 6-5Z",
    logout: "M9 3H4v18h5 M10 12h11 M17 8l4 4-4 4",
    arrow: "M4 12h16 M14 6l6 6-6 6",
    plus: "M12 5v14 M5 12h14",
    check: "M5 12l4 4L19 6",
    clock: "M12 3a9 9 0 110 18 9 9 0 010-18 M12 7v5l3 2",
    search: "M10 3a7 7 0 110 14 7 7 0 010-14 M15 15l6 6",
    bell: "M18 8a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9 M10 21h4",
    user: "M12 3a4 4 0 110 8 4 4 0 010-8 M4 21v-2a8 8 0 0116 0v2",
    truck:
      "M2 5h12v12H2z M14 9h4l4 4v4h-8 M6 17a2 2 0 110 4 2 2 0 010-4 M18 17a2 2 0 110 4 2 2 0 010-4",
    spark: "M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z",
    menu: "M3 6h18 M3 12h18 M3 18h18",
    close: "M6 6l12 12 M18 6L6 18",
    edit: "M4 16L16 4l4 4L8 20H4v-4Z",
    wallet: "M3 5h17v15H3z M16 10h6v6h-6z",
    shield: "M12 2l9 4v6c0 6-9 10-9 10S3 18 3 12V6l9-4Z M8 12l3 3 5-6",
    info: "M12 3a9 9 0 110 18 9 9 0 010-18 M12 11v6 M12 7v1",
  };
}

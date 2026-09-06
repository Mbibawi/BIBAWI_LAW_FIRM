type RouteHandler = (cat?: string) => HTMLElement;


type Expertise = {
  title: string;
  short: string;
  detail: string;
  icon: () => SVGSVGElement;
}
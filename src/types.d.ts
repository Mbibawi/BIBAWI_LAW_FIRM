type RouteHandler = (cat?: string) => HTMLElement;


type Expertise = {
  title: string;
  short: string;
  detail: string;
  icon: () => SVGSVGElement;
}

type Post = {
  id: string,
  type: 'POST' | 'PAGE',
  title: string,
  date: string,
  image: string,
  published?: string,
  updated?: string,
  content: string,
  tags?: string[],
  dir: 'ltr' | 'rtl',
  audio?: string,
  isRoot?: boolean,
}
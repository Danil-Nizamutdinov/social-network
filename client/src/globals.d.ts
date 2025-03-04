declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export = classes;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.jpg" {
  const content: any;
  export default content;
}

declare module "*.svg" {
  const svg: string;
  export default svg;
}

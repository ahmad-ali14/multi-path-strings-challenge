export interface Istory {
  text: string;
  up: number | null;
  left: number | null;
  down: number | null;
  right: number | null;
}

export interface ImultiString {
    list: Istory[];
}
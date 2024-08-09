class ListProductPropertyDTO {
  name: string;
  description: string;
}

class ListProductImageDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly properties: ListProductPropertyDTO[],
    readonly images: ListProductImageDTO[],
  ) {}
}

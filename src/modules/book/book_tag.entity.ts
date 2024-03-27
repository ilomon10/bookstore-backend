export interface BookTagSchema {
  id: string;
  name: string;
}

export interface BookTagAssociationSchema {
  id: string;
  book_id: string;
  tag_id: string;
}
export interface Brand {
  name: string;
  image: string;
}

export interface FilterProps {
  manufacturer?: string;
  model?: string;
}

export interface SearchProps {
  searchParams: FilterProps;
}

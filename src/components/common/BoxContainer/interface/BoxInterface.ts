export interface ContestBoxProps {
  activityIdx: number;
  title: string;
  body: string;
  imageUrl: string | null;
  startTime: string;
  endTime: string;
  category: string;
  favorite: number;
  hitCount: number;
  commentCount: string;
  favoriteCount: string;
  cursor: string;
  isLastItem?: boolean;
  getSearchResult: () => void;
  setCursor: () => void;
}

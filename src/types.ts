export type Results<T> = Array<T> | Promise<Array<T>>;
export type Extension<T> = (query: string) => Results<T>;

export interface ResultsItem {
  title: string;
  url?: string;
}

export type ResultRenderer<T> = ({
  item,
  isSelected,
  isHighlighted,
}: {
  item: T;
  isSelected: boolean;
  isHighlighted: boolean;
} & React.HTMLAttributes<HTMLElement>) => JSX.Element;

export interface ISearchBar<T> {
  /** 自定义输入框内容 */
  value?: string;

  /** placeholder */
  placeholder?: string;

  /** 根节点className */
  className?: string;

  /** 默认获取焦点 */
  autoFocus?: boolean;

  /** 主题 */
  theme?: "light" | "dark";

  /** 输入框style */
  style?: React.CSSProperties;

  /** 根节点style */
  rootStyle?: React.CSSProperties;

  /** 结果框style */
  resultsStyle?: React.CSSProperties;

  /** 最多展示多少条结果 */
  maxResults?: number;

  /** 未滚动时最多展示多少条结果 */
  maxViewableResults?: number;

  /** 查询function数组 */
  extensions?: Array<Extension<T>>;

  /** 延迟查询debounce时间 */
  inputDelay?: number;

  /** 获得焦点时回调 */
  onFocus?: (evt: React.FocusEvent<HTMLInputElement>) => void;

  /** 失去焦点时回调 */
  onBlur?: (evt: React.FocusEvent<HTMLInputElement>) => void;

  /** 某项结果被选中时回调 */
  onSelect?: <T>(item: T) => void;

  /** 文本框变化时回调 */
  onChange?: <T>(item: T) => void;

  /** 当某项query被触发时回调 */
  onQuery?: <T>(items: Array<T>) => void;

  /** 结果项render方法 */
  children?: ResultRenderer<T>;

  /** chilren */
  render?: ResultRenderer<T>;
}

export interface IInput extends React.HTMLProps<HTMLInputElement> {
  /** 主题 */
  theme?: "light" | "dark";
}

export interface IResults<T> {
  /** 结果array */
  items: Array<T>;

  /** 当前选中Id */
  selectedIndex: number;

  /** chilren */
  children?: ResultRenderer<T>;

  /** 自定义样式 */
  style?: React.CSSProperties;

  /** 最大高度 */
  maxHeight?: number | string | null;

  /** onMouseEnter */
  onMouseEnter?: (e: React.MouseEvent) => void;

  /** onMouseLeave */
  onMouseLeave?: (e: React.MouseEvent) => void;

  /** onClick */
  onClickItem?: (e: React.MouseEvent) => void;

  /** onMouseEnterItem */
  onMouseEnterItem?: (index: number) => void;

  /** onMouseLeaveItem */
  onMouseLeaveItem?: (index: number) => void;
}

export interface IResultsItem<T> {
  /** item */
  item: ResultsItem & T;

  /** 是否选中 */
  isSelected?: boolean;

  /** 自定义样式 */
  style?: React.CSSProperties;

  /** chilren */
  children?: ResultRenderer<T>;

  /** onMouseEnter */
  onMouseEnter?: (e: React.MouseEvent) => void;

  /** onMouseLeave */
  onMouseLeave?: (e: React.MouseEvent) => void;

  /** onClickItem */
  onClickItem?: (e: React.MouseEvent) => void;
}

export interface IResultsItemRenderer<T> {
  item: ResultsItem & T;
  isSelected?: boolean;
  isHighlighted?: boolean;
}

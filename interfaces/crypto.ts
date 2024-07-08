interface Status {
  credit_count: number;
  elapsed: number;
  error_code: number;
  error_message: null;
  notice: null;
  timestamp: string;
  total_count: number;
}

export interface Currency {
  circulating_supply: number;
  cmc_rank: number;
  date_added: string;
  id: number;
  infinite_supply: boolean;
  last_updated: string;
  max_supply: null | number;
  name: string;
  num_market_pairs: number;
  platform: string | null;
  quote: Quote;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  slug: string;
  symbol: string;
  tags: string[];
  total_supply: number;
  tvl_ratio: null;
}

interface Quote {
  EUR: EUR;
}

interface EUR {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl?: any;
  last_updated: string;
}

export interface Ticker {
  timestamp: string;
  price: number;
  volume_24h: number;
  market_cap: number;
}

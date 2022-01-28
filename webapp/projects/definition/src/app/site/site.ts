export class ResponseSiteList {
  data: SiteData[] = [];
}

export class Site {
  data: SiteData = new SiteData();
}

export class SiteData {
  id: number;
  name: string;
  site_id: number;
  client_id: number;
  client_code: number;
  client_name: string;
  country: string;
  city: string;
  address: string;
  progress: SiteProgress;
  link: string;
  serial_no?: string;
  status?: number;
  mode?: number;
  lastPush?: number;
}

export class SiteSearch {
  client: number;
  name: string;
}

export class SiteProgress {
  commissioning: Progress;
  definition: Progress;
}

export class Progress {
  total: number;
  created: number;
  progressInPercent?: number;
}

export class SitePolling {
  data: Array<SitePollingData> = [];
}

export class SitePollingData {
  last_push: number;
  progress: SiteProgress;
  site_id: number;
  site_mode: number;
  status: number;
}

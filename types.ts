
export type Platform = 'instagram' | 'linkedin' | 'x' | 'facebook' | 'threads';

export interface SocialAccount {
  id: string;
  platform: Platform;
  name: string;
  handle: string;
  avatar: string;
}

export interface Post {
  id: string;
  content: string;
  accountIds: string[];
  scheduleDate: Date;
  status: 'draft' | 'scheduled' | 'posted';
  platformVariations?: Record<Platform, string>;
  mediaUrl?: string;
}

export interface LibraryItem {
  id: string;
  title: string;
  content: string;
  tags: string[];
  platform?: Platform;
  lastUsed?: Date;
}

export interface AIRepurposeResponse {
  variations: {
    platform: Platform;
    content: string;
    hashtags: string[];
    cta: string;
  }[];
}

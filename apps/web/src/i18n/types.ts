/**
 * @file apps/web/src/i18n/types.ts
 * @layer Layer 3: Domain / Pipelines / Contracts
 * @description Core type definitions, interfaces, and schema contracts for internationalization (i18n).
 * Defines supported locales, locale metadata, route translation mapping, and message catalog structures.
 */

/**
 * Enumeration of supported ISO 639-1 language codes for ANDHRAY official platform.
 * Supports 8 languages: English, Spanish, German, Italian, French, Portuguese, Simplified Chinese, Japanese.
 */
export type SupportedLocale = 'en' | 'es' | 'de' | 'it' | 'fr' | 'pt' | 'zh' | 'ja';

/**
 * Text direction specification for HTML markup and layout rendering.
 */
export type TextDirection = 'ltr' | 'rtl';

/**
 * Complete metadata descriptor for a supported locale.
 */
export interface LocaleMetadata {
  /** ISO 639-1 two-letter code */
  readonly code: SupportedLocale;
  /** English display name */
  readonly name: string;
  /** Endonym (native name as displayed to native speakers) */
  readonly nativeName: string;
  /** BCP 47 full language tag */
  readonly bcp47: string;
  /** Text directionality */
  readonly direction: TextDirection;
  /** Regional flag emoji representation for UI badges */
  readonly flag: string;
  /** Whether this is the default fallback locale */
  readonly isDefault?: boolean;
}

/**
 * Pathname localization dictionary mapping internal route names to locale-specific slugs.
 */
export interface LocalizedPathnames {
  readonly [pathKey: string]: {
    readonly [K in SupportedLocale]: string;
  } | string;
}

/**
 * Internationalization routing configuration schema.
 */
export interface I18nRoutingConfig {
  /** List of all supported locale identifiers */
  readonly locales: readonly SupportedLocale[];
  /** Fallback locale when visitor locale is unsupported */
  readonly defaultLocale: SupportedLocale;
  /** Strategy for prefixing URLs with locale code ('always' | 'as-needed' | 'never') */
  readonly localePrefix: 'always' | 'as-needed' | 'never';
  /** Localized pathname mappings for SEO-friendly URLs */
  readonly pathnames?: LocalizedPathnames;
}

/**
 * Navigation items contract schema for localized menus.
 */
export interface NavItemTranslation {
  readonly label: string;
  readonly description?: string;
}

/**
 * Translation message schema contract defining sections across the platform.
 */
export interface MessagesSchema {
  readonly nav: {
    readonly home: string;
    readonly music: string;
    readonly events: string;
    readonly bio: string;
    readonly news: string;
    readonly booking: string;
    readonly press: string;
  };
  readonly home: {
    readonly heroTitle: string;
    readonly heroSubtitle: string;
    readonly badge: string;
    readonly slogan: string;
    readonly listenNow: string;
    readonly exploreTour: string;
  };
  readonly bio: {
    readonly title: string;
    readonly subtitle: string;
    readonly statement: string;
    readonly collective: string;
    readonly soundDescription: string;
    readonly visitCollectiveButton: string;
    readonly impactTitle: string;
    readonly countriesLabel: string;
    readonly continentsLabel: string;
    readonly streamsLabel: string;
    readonly showcaseLabel: string;
    readonly downloadEpkButton: string;
  };
  readonly tour: {
    readonly title: string;
    readonly subtitle: string;
    readonly description: string;
    readonly searchPlaceholder: string;
    readonly featuredBadge: string;
    readonly featuredTitle: string;
    readonly currentLocationPrefix: string;
    readonly contactBookingButton: string;
    readonly bookingOpenBadge: string;
    readonly soldOutBadge: string;
    readonly rsvpBadge: string;
    readonly ticketsBadge: string;
    readonly noShowsFound: string;
    readonly viewFullCalendar: string;
    readonly featuredDetail: string;
    readonly featuredLocation: string;
    readonly tourDate1City: string;
    readonly tourDate1Month: string;
    readonly tourDate1Venue: string;
    readonly tourDate2City: string;
    readonly tourDate2Month: string;
    readonly tourDate2Venue: string;
  };
  readonly news: {
    readonly title: string;
    readonly subtitle: string;
    readonly liveBadge: string;
    readonly liveDate: string;
    readonly liveDescription: string;
    readonly watchLiveButton: string;
    readonly featuredTrackTitle: string;
    readonly featuredTrackType: string;
    readonly upcomingBadge: string;
    readonly upcomingTitle: string;
    readonly upcomingDescription: string;
  };
  readonly booking: {
    readonly title: string;
    readonly sectionTag: string;
    readonly description: string;
    readonly managementAssistantRole: string;
    readonly managerName: string;
    readonly managerEmail: string;
    readonly whatsappButton: string;
    readonly proposalsTitle: string;
    readonly proposalsDescription: string;
    readonly formNameLabel: string;
    readonly formNamePlaceholder: string;
    readonly formEmailLabel: string;
    readonly formEmailPlaceholder: string;
    readonly formTypeLabel: string;
    readonly formOptionMusic: string;
    readonly formOptionPress: string;
    readonly formOptionStreaming: string;
    readonly formOptionShowcases: string;
    readonly formOptionOther: string;
    readonly formMessageLabel: string;
    readonly formMessagePlaceholder: string;
    readonly formSubmitButton: string;
    readonly formSuccessTitle: string;
    readonly formSuccessMessage: string;
    readonly formSendAnotherButton: string;
  };
  readonly contactPage: {
    readonly tag: string;
    readonly title: string;
    readonly subtitle: string;
    readonly cardAssistantBadge: string;
    readonly cardAssistantTitle: string;
    readonly cardAssistantRole: string;
    readonly cardAssistantButton: string;
    readonly cardEmailBadge: string;
    readonly cardEmailTitle: string;
    readonly cardEmailDescription: string;
    readonly cardEmailPlatformLabel: string;
    readonly cardTourBadge: string;
    readonly cardTourTitle: string;
    readonly cardTourDescription: string;
    readonly cardTourButton: string;
    readonly formTag: string;
    readonly formTitle: string;
    readonly formSubtitle: string;
    readonly formNameLabel: string;
    readonly formNamePlaceholder: string;
    readonly formEmailLabel: string;
    readonly formEmailPlaceholder: string;
    readonly formPhoneLabel: string;
    readonly formPhonePlaceholder: string;
    readonly formCityLabel: string;
    readonly formCityPlaceholder: string;
    readonly formVenueLabel: string;
    readonly formVenuePlaceholder: string;
    readonly formDateLabel: string;
    readonly formFormatLabel: string;
    readonly formOptionClub: string;
    readonly formOptionFestival: string;
    readonly formOptionShowcase: string;
    readonly formOptionBroadcast: string;
    readonly formOptionPress: string;
    readonly formDetailsLabel: string;
    readonly formDetailsPlaceholder: string;
    readonly formSubmitButton: string;
    readonly formSubmittingButton: string;
    readonly formSuccessTitle: string;
    readonly formSuccessMessage: string;
    readonly formSuccessAnotherButton: string;
  };
  readonly musicPage: {
    readonly tag: string;
    readonly title: string;
    readonly subtitle: string;
    readonly tracklistTag: string;
    readonly tracklistTitle: string;
    readonly tracklistSubtitle: string;
    readonly channelAriaLabel: string;
    readonly recordingsTag: string;
    readonly recordingsTitle: string;
    readonly recordingsSubtitle: string;
    readonly liveSessionBadge: string;
    readonly featuredSetBadge: string;
    readonly watchOnYoutube: string;
    readonly listenOnSoundcloud: string;
  };
  readonly mediaPage: {
    readonly title: string;
    readonly tag: string;
    readonly featuredSetTitle: string;
    readonly featuredSetDescription: string;
    readonly watchYoutube: string;
    readonly visualRecordTag: string;
    readonly editorialGalleryTitle: string;
    readonly pressTag: string;
    readonly pressTitle: string;
    readonly listenButton: string;
  };
  readonly pressKitPage: {
    readonly title: string;
    readonly photosTag: string;
    readonly photoAlt: string;
    readonly downloadOriginal: string;
    readonly videosTag: string;
    readonly videoUnsupported: string;
  };
  readonly livePage: {
    readonly tag: string;
    readonly title: string;
  };
  readonly footer: {
    readonly rights: string;
    readonly collectiveNotice: string;
    readonly navigationTitle: string;
    readonly inquiriesTitle: string;
    readonly backToTop: string;
  };
}

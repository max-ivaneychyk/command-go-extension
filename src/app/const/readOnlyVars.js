export const READ_ONLY_VARS = {
  $CHROME: '$CHROME',
  $WINDOW: '$WINDOW',
  $DOCUMENT: '$DOCUMENT',
  $BODY: '$BODY',
  $NULL: '$NULL',
  $TRUE: '$TRUE',
  $FALSE: '$FALSE',
  $UNDEFINED: '$UNDEFINED',
  $ZERO: '$ZERO',
}

export const READ_ONLY_VARS_VALUES = {
  [READ_ONLY_VARS.$CHROME]: () => chrome,
  [READ_ONLY_VARS.$WINDOW]: () => window,
  [READ_ONLY_VARS.$DOCUMENT]: () => document,
  [READ_ONLY_VARS.$BODY]: () => document.body,
  [READ_ONLY_VARS.$NULL]: () => null,
  [READ_ONLY_VARS.$TRUE]: () => true,
  [READ_ONLY_VARS.$FALSE]: () => false,
  [READ_ONLY_VARS.$UNDEFINED]: () => undefined,
  [READ_ONLY_VARS.$ZERO]: () => 0,
}

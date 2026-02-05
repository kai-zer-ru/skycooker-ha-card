// Утилиты для проверки статусов (поддержка RU/EN)
// Значения соответствуют sensor.status интеграции skycooker-ha

const STATUS_ACTIVE = [
  'Готовка',
  'Cooking',
  'Разогрев',
  'Warming',
  'Отложенный старт',
  'Delayed Launch',
  'Подогрев',
  'Auto Warm',
  'Ожидание',
  'Waiting',
];

const STATUS_OFF = [
  'Выключена',
  'Off',
  'Полностью выключена',
  'Fully off',
];

const STATUS_AUTO_WARM = ['Подогрев', 'Auto Warm'];
const STATUS_DELAYED_LAUNCH = ['Отложенный старт', 'Delayed Launch'];

export function shouldShowTemperature(
  _currentMode: string,
  status: string
): boolean {
  return STATUS_ACTIVE.includes(status);
}

export function isStatusOff(status: string): boolean {
  return STATUS_OFF.includes(status);
}

export function shouldShowAutoWarmTime(
  status: string,
  hasAutoWarmTimeEntity: boolean
): boolean {
  return STATUS_AUTO_WARM.includes(status) && hasAutoWarmTimeEntity;
}

export function shouldShowDelayedLaunchTime(
  status: string,
  hasDelayedLaunchEntity: boolean
): boolean {
  return (
    STATUS_DELAYED_LAUNCH.includes(status) && hasDelayedLaunchEntity
  );
}


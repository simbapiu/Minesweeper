const defaultCell = {
  hasMine: false,
  hasFlag: false,
  isOpen: false,
  count: 0,
  id: null
};

const defaultStore = {
  board: { },
  games: [] //pendiente para tener uno o varios juegos activos o finalizados
};

export {defaultStore as default, defaultCell};
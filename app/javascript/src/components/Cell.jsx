import React, { Component } from 'react';
import PropTypes from 'prop-types';

const OpenedCell = ({ count, hasMine }) => (
  <div className="game-cell-opened">
    {!hasMine &&
    <span className={`game-cell-number-${count}`}> { count } </span>
    }
    {hasMine &&
    <span className="game-cell-mine">m</span>
    }
  </div>
);

const ClosedCell = () => (
  <div className="game-cell-closed">
  </div>
);

const FlagCell = () => (
  <div className="game-cell-flag">
  </div>
);

OpenedCell.propTypes = {
  count: PropTypes.number.isRequired,
  hasMine: PropTypes.bool.isRequired
};

const Cell = ({id, count, hasMine, isOpen, hasFlag, onOpen, onFlag}) => (
  <td className="game-cells"
    onClick = { () => onOpen(id) }
    onContextMenu = {(e) => {
      e.preventDefault();
      onFlag(id)
    }
  }>
    {!isOpen && !hasFlag && <ClosedCell />}
    {!isOpen && hasFlag && <FlagCell />}
    {isOpen && <OpenedCell hasMine={hasMine} count={count} />}
  </td>
);

Cell.propTypes = {
  ...OpenedCell.propTypes,
  id: PropTypes.string.isRequired,
  hasFlag: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onFlag: PropTypes.func.isRequired
};

export default Cell;
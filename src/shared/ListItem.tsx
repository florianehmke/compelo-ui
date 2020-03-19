import React, { MouseEvent, useState } from 'react';

type Props = {
  entity: ListItem;
  selected?: boolean;
  onSelect?: (entity: ListItem) => void;
  onDelete?: (entity: ListItem) => void;
};

interface ListItem {
  id: number;
  name: string;
}

const conditionalStyles = (selected: boolean, hovered: boolean) => {
  return {
    container: {
      backgroundColor: hovered ? '#ededed' : undefined
    },
    listItem: {
      cursor: 'pointer',
      textDecoration: selected ? 'underline' : undefined,
      textAlign: 'center' as 'center'
    },
    deleteBtn: {
      cursor: 'pointer'
    }
  };
};

const ListItem = (props: Props) => {
  const [hovered, setHovered] = useState(false);

  const handleSelect = (e: MouseEvent) => {
    e.preventDefault();
    if (props.onSelect) {
      props.onSelect(props.entity);
    }
  };

  const handleDelete = (e: MouseEvent) => {
    e.preventDefault();
    if (props.onDelete) {
      props.onDelete(props.entity);
    }
  };

  const styles = conditionalStyles(props.selected ?? false, hovered);

  return (
    <div
      className={'d-flex w-100 justify-content-between'}
      style={styles.container}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={'ml-3 mr-3 w-100 text-left'}
        style={styles.listItem}
        onClick={handleSelect}
      >
        {props.entity.name}
      </span>
      {hovered ? (
        <span
          style={styles.deleteBtn}
          onClick={handleDelete}
          className={'ml-3 mr-3 text-danger'}
        >
          Delete
        </span>
      ) : null}
    </div>
  );
};

export default ListItem;

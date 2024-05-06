import React from 'react';
import { observer } from '@formily/reactive-react';
import { DroppableWidget } from '@lowcode/react';
// import './styles.less'

type ContainerProps = {
  children?: React.ReactNode;
};

export const Container: React.FC<ContainerProps> = observer((props) => {
  return <DroppableWidget>{props.children}</DroppableWidget>;
});

export const withContainer = (Target: React.JSXElementConstructor<any>) => {
  return (props: any) => {
    return (
      <DroppableWidget>
        <Target {...props} />
      </DroppableWidget>
    );
  };
};

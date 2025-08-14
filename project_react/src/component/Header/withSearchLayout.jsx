import React from 'react';

export default function withSearchLayout(Component) {
  return function WrappedComponent(props) {
    return (
      <div>
        <header style={{ padding: '10px', background: '#eee' }}>
        </header>
        <main style={{ padding: '20px' }}>
          <Component />
        </main>
      </div>
    );
  };
}
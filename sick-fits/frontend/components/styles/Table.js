import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.colors.gainsboro};
  thead {
    font-size: 10px;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.colors.gainsboro};
    border-right: 1px solid ${props => props.theme.colors.gainsboro};
    padding: 10px 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.colors.gainsboro};
    }
  }
`;

export default Table;

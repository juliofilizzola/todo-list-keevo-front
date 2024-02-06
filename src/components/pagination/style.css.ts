import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 10px;
`;

export const PageNumber = styled.span<{ active?: boolean }>`
  cursor: pointer;

  margin: 0 5px;
  padding: 5px;
  border-radius: 20px;

  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};

  color: ${({ active }) => (active ? '#fff' : '#000')};
  background-color: ${({ active }) => (active ? '#3c611e' : '#fff')};
`;

export const Ellipsis = styled.span`
  margin: 0 5px;
`;

export const Arrow = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  margin: 0 5px;
  padding: 5px;
  border-radius: 20px;

  & > svg {
    width: 18px;
    height: 18px;
  }
`;
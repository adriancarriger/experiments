import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const GET_MODAL_OPEN = gql`
  query getModal {
    editModalOpen @client
  }
`;

const SET_MODAL_OPEN = gql`
  mutation SetModal($value: Boolean!) {
    setModal(value: $value) @client
  }
`;

export const setModal = (_root, { value }, { cache }) => {
  cache.writeData({ data: { editModalOpen: value } });
};

export const initialModalState = {
  editModalOpen: false
};

export function useModal() {
  const [setModal] = useMutation(SET_MODAL_OPEN);
  const { data } = useQuery(GET_MODAL_OPEN);

  return {
    editModalOpen: data.editModalOpen,
    setModal: value => setModal({ variables: { value } })
  };
}

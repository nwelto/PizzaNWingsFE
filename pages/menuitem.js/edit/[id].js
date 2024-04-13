import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getMenuItem } from '../../../API/MenuItemData';
import MenuItemForm from '../../../components/forms/MenuItemForm';

export default function EditMenuItem() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      getMenuItem(id).then(setEditItem);
    }
  }, [id]);

  return <MenuItemForm obj={editItem} />;
}

import { useState, useEffect } from 'react';

interface CardNameProps {
  id: number;
  initialName: string;
}

const cache: Record<number, string> = {};

export function CardName({ id, initialName }: CardNameProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (initialName === 'Unknown' || initialName === '未知卡片' || initialName === '') {
      if (cache[id]) {
        setName(cache[id]);
        return;
      }
      
      fetch(`https://ygocdb.com/api/v0/?search=${id}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.result && data.result.length > 0) {
            const cnName = data.result[0].cn_name;
            if (cnName) {
              cache[id] = cnName;
              setName(cnName);
            }
          }
        })
        .catch(err => {
          // ignore
          console.error("Failed to fetch card name", err);
        });
    }
  }, [id, initialName]);

  return <span>{name}</span>;
}

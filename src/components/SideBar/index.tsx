import { useEffect, useState } from 'react';

import { Button } from '../';

import { api } from '../../services/api';

import { Genre } from '../../models/genre';

import '../../styles/sidebar.scss';

interface SideBarProps {
  selectedGenreId: number,
  handleClickButton(id: number): void
}

export function SideBar(props: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}
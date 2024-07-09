import { Button, Toolbar } from '@material-ui/core'
import css from './action-toolbar.module.css'

type ActionToolbarProps = {
  open: () => void
  selectedIds: string[]
}

export const ActionToolbar = ({ open, selectedIds }: ActionToolbarProps) => {
  return (
    <Toolbar className={css.toolbar}>
      <Button variant="contained" color="primary" onClick={open}>
        Создать
      </Button>
      <Button
        disabled={!selectedIds?.length}
        variant="contained"
        color="secondary"
        onClick={() => console.log(2)}
      >
        Удалить
      </Button>
    </Toolbar>
  )
}

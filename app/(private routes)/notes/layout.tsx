import css from "./@sidebar/SidebarNotes.module.css";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

const NotesLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.notesLayout}>
      <aside>{sidebar}</aside>
      <div>{children}</div>
    </section>
  );
};

export default NotesLayout;

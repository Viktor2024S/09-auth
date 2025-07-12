// import Link from "next/link";
// import TagsMenu from "../TagsMenu/TagsMenu";
// import css from "./Header.module.css";

// export default function Header() {
//   return (
//     <header className={css.header}>
//       <div className={css.container}>
//         <Link href="/" aria-label="Home" className={css.logo}>
//           NoteHub
//         </Link>
//         <nav aria-label="Main Navigation">
//           <ul className={css.navigation}>
//             <li>
//               <Link href="/" className={css.link}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <TagsMenu />
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// }

import Link from "next/link";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Home" className={css.logo}>
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/" className={css.link}>
                Home
              </Link>
            </li>
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}

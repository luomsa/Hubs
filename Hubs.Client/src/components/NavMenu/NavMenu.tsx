import styles from "./NavMenu.module.css";
import AuthModal from "../AuthModal/AuthModal.tsx";
import Input from "../ui/Input/Input.tsx";
import { useAuth } from "../../context/AuthContext.tsx";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import useDebounce from "../../utils/useDebounce.tsx";
import client from "../../api/http.ts";
import { HubSearchDto } from "../../types.ts";
import { Link } from "react-router-dom";
import { IconMenu2 } from "@tabler/icons-react";
type Props = {
  toggleMenu: () => void;
};
const NavMenu = ({ toggleMenu }: Props) => {
  const { state } = useAuth();
  const [search, setSearch] = useState("");

  const [debounceVal, setDebounceVal] = useState<HubSearchDto[]>([]);

  const debounceValue = useDebounce(search, 800);
  const searchResultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (search == "") return;
    client
      .GET("/api/hubs/search", { params: { query: { q: search } } })
      .then((r) => r.data !== undefined && setDebounceVal(r.data));
    if (searchResultsRef.current !== null)
      searchResultsRef.current.hidden = false;
  }, [debounceValue]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  useEffect(() => {
    document.body.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      if (
        searchResultsRef.current !== null &&
        target.parentElement !== searchResultsRef.current
      ) {
        searchResultsRef.current.hidden = true;
      }
    });
  }, []);
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <h2>Hubs</h2>
      </div>
      <div className={styles["mobile-button"]}>
        <button onClick={toggleMenu}>
          <IconMenu2 stroke={2} />
        </button>
      </div>
      <div className={styles.search}>
        <Input
          autoCapitalize={"off"}
          type={"text"}
          placeholder={"Search"}
          onChange={handleSearch}
        />

        <div
          ref={searchResultsRef}
          className={styles.result}
          hidden={debounceVal.length <= 0}
        >
          {debounceVal.map((h) => (
            <div key={h.hubId} className={styles.item}>
              <Link
                to={`/hub/${h.name}`}
                onClick={() => {
                  if (searchResultsRef.current !== null)
                    searchResultsRef.current.hidden = true;
                }}
              >
                <p>{h.name}</p>
                <p>{h.totalMembers} members</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div>{state.user === null ? <AuthModal /> : <p>logged in</p>}</div>
    </div>
  );
};
export default NavMenu;

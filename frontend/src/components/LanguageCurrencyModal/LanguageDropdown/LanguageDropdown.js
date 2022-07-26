import React, { useState, useEffect, useRef } from "react";
import styles from "./LanguageDropdown.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

import French from "../../../svgs/languages_flags/french.svg";
import English from "../../../svgs/languages_flags/english.svg";
import { ReactSVG } from "react-svg";
import Button2 from "../../UI-Components/Button2/Button2";

function useOutsideAlerter(ref, setShowDropdown) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export default function LanguageDropdown({
  language,
  setLanguage,
  setShowLanguageModal,
}) {
  const options = [
    <div className={styles.option}>
      <ReactSVG src={French} />
      <span>French</span>
    </div>,
    <div className={styles.option}>
      <ReactSVG src={English} />
      <span>English</span>
    </div>,
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowDropdown);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.top__wrapper}>
        <span className={styles.label}>Language</span>
        <div
          style={{
            borderBottomLeftRadius: showDropdown === true && 0,
            borderBottomRightRadius: showDropdown === true && 0,
          }}
          className={styles.selection}
          onClick={() => setShowDropdown((prevState) => !prevState)}>
          <span className={styles.selectedOption}>{selectedOption}</span>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
      </div>
      {showDropdown ? (
        <div className={styles.dropdown__wrapper}>
          <ul>
            <li
              onClick={() => {
                setSelectedOption(options[0]);
                setShowDropdown(false);
                setLanguage("fr");
              }}>
              {options[0]}
            </li>
            <li
              onClick={() => {
                setSelectedOption(options[1]);
                setShowDropdown(false);
                setLanguage("en");
              }}>
              {options[1]}
            </li>
          </ul>
        </div>
      ) : null}
      <Button2
        content={"Save"}
        handleClick={setShowLanguageModal}
        parameter={false}
      />
    </div>
  );
}

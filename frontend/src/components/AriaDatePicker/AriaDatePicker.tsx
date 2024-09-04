"use client";
import {
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  Group,
  Heading,
  Label,
  Popover,
} from "react-aria-components";
import styles from "./AriaDatePicker.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import AriaButton from "../Button/Button";

const AriaDatePicker = () => {
  return (
    <DatePicker className={styles.datePicker}>
      <Label className={styles.label}>Datum</Label>
      <Group className={styles.dateInputGroup}>
        <DateInput className={styles.dateInput}>
          {(segment) => <DateSegment segment={segment} />}
        </DateInput>
        <AriaButton className={styles.button}>
          <FontAwesomeIcon icon={faCalendar} />
        </AriaButton>
      </Group>
      <Popover>
        <Dialog>
          <Calendar className={styles.calendar}>
            <header className={styles.header}>
              <AriaButton
                variant="link"
                slot="previous"
                className={styles.calendarNav}
              >
                <FontAwesomeIcon icon={faCaretLeft} />
              </AriaButton>
              <Heading />
              <AriaButton
                variant="link"
                slot="next"
                className={styles.calendarNav}
              >
                <FontAwesomeIcon icon={faCaretRight} />
              </AriaButton>
            </header>
            <CalendarGrid className={styles.calendarGrid}>
              {(date) => (
                <CalendarCell date={date} className={styles.calendarCell} />
              )}
            </CalendarGrid>
          </Calendar>
        </Dialog>
      </Popover>
    </DatePicker>
  );
};

export default AriaDatePicker;

import { format, isSameDay, parseISO, differenceInDays } from 'date-fns';
import styled from '@emotion/styled';

import { ko } from 'date-fns/locale';
import { DateRange, DayPicker } from 'react-day-picker';
import { colors } from '@/styles/colorPalette';

interface RangePickerProps {
  startDate?: string;
  endDate?: string;
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void;
}

export default function RangePicker({
  startDate,
  endDate,
  onChange,
}: RangePickerProps) {
  const today = new Date();

  const handleDayClick = (dateRange: DateRange | undefined) => {
    console.log('🚀 ~ handleDayClick ~ dateRange:', dateRange);
    if (dateRange == null) {
      return;
    }

    const { from, to } = dateRange;

    // 1. 중복된 날짜 처리
    if (from && to && isSameDay(from, to)) {
      return;
    }

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    });
  };

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  };

  return (
    <Container>
      <DayPicker
        locale={ko}
        mode='range'
        numberOfMonths={5}
        defaultMonth={today}
        min={1}
        onSelect={handleDayClick}
        selected={selected}
      />
    </Container>
  );
}

const Container = styled.div`
  padding-bottom: 80px;

  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 60px 0 30px;
  }

  .rdp-month_caption {
    position: absolute;
    top: 25px;
    left: 20px;
    color: ${colors.black};
    font-weight: bold;
  }

  .rdp-nav {
    display: none;
  }

  .rdp-month_grid {
    width: 100%;

    thead {
      color: ${colors.gray400};
      font-weight: bold;
      height: 45px;
      font-size: 12px;
    }

    tbody .rdp-week {
      height: 45px;
    }
  }

  .rdp-day .rdp-day_button {
    line-height: 45px;
    width: 100%;
  }

  .rdp-selected {
    color: ${colors.white};
    background-color: ${colors.blue};
  }

  .rdp-range_middle {
    background-color: ${colors.blue100};
    color: ${colors.black};
  }

  .rdp-range_start,
  .rdp-range_end {
    color: ${colors.white};
    background-color: ${colors.blue};
  }
`;

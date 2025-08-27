import React, { useMemo, useState } from 'react';

interface Txn {
  id: string;
  date: string;
  description: string;
  amount: number;
}

interface TxnsTableProps {
  txns: Txn[];
}

type SortDirection = 'asc' | 'desc' | null;

const containerStyle: React.CSSProperties = {
    overflowX: 'auto',
};

const tableStyle: React.CSSProperties = {
    border: '1px solid black',
    borderCollapse: 'collapse' as const
};

const cellStyle: React.CSSProperties = {
    border: '1px solid black',
    padding: '8px'
};

const headerButtonStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    font: 'inherit',
};

const controlsStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    marginBottom: '10px',
    alignItems: 'center',
};

const dateRangeStyle: React.CSSProperties = { display: 'flex', gap: '10px', marginBottom: '10px' }

function parseDateOnly(value: string, endOfDay = false): Date | null
{
    if (!value) return null;
    // value is "YYYY-MM-DD" from the date input; construct in local time
    const [y, m, d] = value.split('-').map(Number);
    if (!y || !m || !d) return null;
    const dt = new Date(y, m - 1, d);
    if (Number.isNaN(dt.getTime())) return null;

    if (endOfDay) {
        dt.setHours(23, 59, 59, 999);
        return dt;
    }

    dt.setHours(0, 0, 0, 0);
    return dt;
}

const formatAmount = (n: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);  

const TxnsTable: React.FC<TxnsTableProps> = ({ txns }) => {
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const filteredTxns = useMemo(() => {
        const start = parseDateOnly(startDate);
        const end = parseDateOnly(endDate, true);

        // If both invalid or empty, return all
        if (!start && !end) return txns;

        // If both exist and start > end, return empty (or could swap and continue)
        if (start && end && start > end) return [];

        return txns.filter((txn) => {
            const txnDate = new Date(txn.date);
            if (Number.isNaN(txnDate.getTime())) return false; // CHANGE: guard against invalid dates in data
            if (start && txnDate < start) return false;
            if (end && txnDate > end) return false;
            return true;
        });
    }, [txns, startDate, endDate]); // Always updates when txns changes (parent), or the date filters changed.

    const sortedTxns = useMemo(() => {
        if (!sortDirection) return filteredTxns;
        const arr = [...filteredTxns];
        arr.sort((a, b) =>
            sortDirection === 'asc' ? a.amount - b.amount : b.amount - a.amount
        );
        return arr;
    }, [filteredTxns, sortDirection]); // Always rerender if filteredTxns changes, or sorting direction changed from header click


    const sortByAmount = () => {
        setSortDirection(prev => {
            switch (prev) {
                case 'asc':
                    return 'desc';
                case 'desc':
                default:
                    return 'asc';
            }
        });
    };

    const clearFilters = () => {
        setStartDate('');
        setEndDate('');
    };

    const ariaSort = sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : 'none';

    return (
        <>
            <div style={controlsStyle}>
                <div style={dateRangeStyle}>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="Start Date"
                    />
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="End Date"
                    />
                    <button type="button" onClick={clearFilters} disabled={!startDate && !endDate}>
                        Clear
                    </button>
                </div>
            </div>

            <div style={containerStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>ID</th>
                            <th style={cellStyle}>Date</th>
                            <th style={cellStyle}>Description</th>
                            <th style={cellStyle} aria-sort={ariaSort as React.AriaAttributes['aria-sort']}>
                                <button type="button" style={headerButtonStyle} onClick={sortByAmount}>
                                Amount
                                {sortDirection === 'asc' ? ' ↑' : sortDirection === 'desc' ? ' ↓' : ' ↕'}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedTxns.length === 0
                            ? 
                            (
                                <tr>
                                    <td style={cellStyle} colSpan={4}>
                                        No transactions found
                                    </td>
                                </tr>
                            )
                            :
                            (
                                sortedTxns.map((txn) => (
                                    <tr key={txn.id}>
                                        <td style={cellStyle}>{txn.id}</td>
                                        <td style={cellStyle}>{txn.date}</td>
                                        <td style={cellStyle}>{txn.description}</td>
                                        <td style={cellStyle}>{formatAmount(txn.amount)}</td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TxnsTable;

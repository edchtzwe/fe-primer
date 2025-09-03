'use client';

import React, { CSSProperties } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/stores/store';
import { toggleDirection } from '@/stores/TxnsSlice';
import { useTxnsTableStore } from '@/stores/TxnsTableStore';

interface Txn {
    date: string;
    description: string;
    amount: number;
}

interface TxnsTableProps {
  txns: Txn[];
}

const tableStyle: CSSProperties = {
    borderCollapse: 'collapse',
    width: '100%',
    border: '1px solid black',
};

const cellStyle: CSSProperties = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'left',
};

const TxnsTable: React.FC<TxnsTableProps> = ({ txns }) => {
    const sortDir = useSelector((state: RootState) => state.sort.direction);
    const dispatch = useDispatch();

    const startDate = useTxnsTableStore((s) => s.startDate);
    const endDate = useTxnsTableStore((s) => s.endDate);
    const setStartDate = useTxnsTableStore((s) => s.setStartDate);
    const setEndDate = useTxnsTableStore((s) => s.setEndDate);

    const filteredTxns = React.useMemo(() => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
        let validDateRange = (startDateObj < endDateObj && startDateObj !== endDateObj);
        if (validDateRange) {
            validDateRange = (!isNaN(startDateObj.getTime()) && !isNaN(endDateObj.getTime()));
        }

        if (!validDateRange) {
            return txns;
        }

        return txns.filter(txn => {
            const txnDate = new Date(txn.date);
            if (isNaN(txnDate.getTime())) {
                // Show anyway so the user gets a chance to fix it
                return true;
            }

            const afterStartDate = txnDate >= startDateObj;
            const beforeEndDate = txnDate <= endDateObj;

            return afterStartDate && beforeEndDate;
        });
    }, [txns, startDate, endDate]);

    const workingTxns = React.useMemo(() => {
        const data = [...filteredTxns].sort((a, b) =>
            sortDir === 'asc' ? a.amount - b.amount : b.amount - a.amount
        );

        return data;
    }, [filteredTxns, sortDir]);

    const sortByAmount = () => {
        dispatch(toggleDirection());
    };

    return (
        <div className='main'>
            <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
                <div>
                    <label htmlFor='startDate'>From: </label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='endDate'>To: </label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>Date</th>
                        <th style={cellStyle}>Description</th>
                        <th style={cellStyle} onClick={sortByAmount}>Amount {sortDir === 'asc' ? '▲' : '▼'}</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        workingTxns.length
                        ?
                        workingTxns.map((txn, index) => (
                            <tr key={index}>
                                <td style={cellStyle}>{txn.date}</td>
                                <td style={cellStyle}>{txn.description}</td>
                                <td style={cellStyle}>{txn.amount}</td>
                            </tr>
                        ))
                        :
                        <tr><td colSpan={3} style={{ textAlign: 'center' }}>NO DATA FOUND</td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default TxnsTable;

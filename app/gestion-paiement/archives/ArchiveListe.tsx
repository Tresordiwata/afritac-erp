"use client";
import React, { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import type { InputRef, TableColumnsType, TableColumnType } from "antd";
import { Button, Divider, Input, Space, Table } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";

import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/services/getData";
import { IPaiement } from "@/lib/types/paiement";
import moment from "moment";
import LayoutSecond from "@/layouts/LayoutSecond";

interface DataType {
  key: number | undefined;
  client: string;
  montant: number;
  datePaiement: Date;
}

type DataIndex = keyof DataType;

export default function ArchiveListe() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  let data: DataType[] = [];

  const dataAll = useQuery({
    queryKey: ["archives"],
    queryFn: getDashboardData,
    refetchInterval: 3000,
  }).data;

  const archiveds = dataAll?.archiveds as IPaiement[];
  let DataRow: DataType[] = [];
  archiveds?.map((archive) => {
    DataRow.push({
      key: archive.id,
      client: archive.client.nom_client,
      datePaiement: archive.datePaiement,
      montant: archive.montant,
    });
  });
  data = DataRow;

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      // <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}> A remettre en cas d'erreur
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]?.toString()?.toLowerCase()?.includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =><div>{text}</div>
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      width: "30%",
      ...getColumnSearchProps("client"),
    },
    {
      title: "Date paiement",
      dataIndex: "datePaiement",
      key: "datePaiement",
      width: "20%",

      ...getColumnSearchProps("montant"),
      render: (_, record) => <div>{moment(_).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Montant",
      dataIndex: "montant",
      key: "montant",

      sorter: (a, b) => a.montant - b.montant,
      sortDirections: ["descend", "ascend"],
      render: (_, record) => <div>{_} USD</div>,
    },
    // {
    //   title: "Montant",
    //   dataIndex: "montant",
    //   key: "montant",
    //   ...getColumnSearchProps("datePaiement"),
    //   sorter: (a, b) => a.datePaiement.length - b.datePaiement.length,
    //   sortDirections: ["descend", "ascend"],
    // },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, r) => <Button onClick={()=>{alert("ok")}}>Desarchiver</Button>,
    },
  ];
  return (
    <LayoutSecond backable={true} titre={"Gestion des Factures : Archives"}>
      <Table<DataType> columns={columns} dataSource={data} />
    </LayoutSecond>
  );
}

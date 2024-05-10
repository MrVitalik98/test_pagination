import Head from "next/head";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Pagination from "react-js-pagination";
import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });

type TUserItem = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  updatedAt: string;
};

type TGetServerSideProps = {
  statusCode: number;
  users: TUserItem[];
  total?: number;
  limit?: number;
  page?: number;
};

export const getServerSideProps: GetServerSideProps<TGetServerSideProps> = async (
  ctx: GetServerSidePropsContext
) => {
  try {
    const { page = 1 } = ctx.query;

    const res = await fetch(`http://api-server:3000/users?page=${page}`, { method: 'GET' });

    if (!res.ok) {
      return {
        props: {
          statusCode: res.status,
          users: [],
        },
      };
    }

    const result = await res.json();

    return {
      props: { statusCode: 200, users: result.data, ...result },
    };
  } catch (e) {
    console.log('ERROR', e)
    return { props: { statusCode: 500, users: [] } };
  }
};

export default function Home({
  statusCode,
  users,
  limit,
  total,
  page,
}: TGetServerSideProps) {
  const router = useRouter()

  if (statusCode !== 200) {
    return <Alert variant={"danger"}>Ошибка {statusCode} при загрузке данных</Alert>;
  }

  const handlePageChange = async (pageNumber: number): Promise<void> => {
    router.push(`?page=${pageNumber}`)
  };

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={"mb-5"}>Пользователи</h1>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Дата обновления</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {
            users?.length
              ? (<Pagination
                itemClass="page-item"
                linkClass="page-link"
                activePage={page ?? 1}
                itemsCountPerPage={limit}
                totalItemsCount={total ?? 0}
                pageRangeDisplayed={10}
                onChange={handlePageChange}
              />)
                : ''
          }
        </Container>
      </main>
    </>
  );
}

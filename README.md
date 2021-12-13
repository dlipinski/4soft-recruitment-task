Trochę się zapędziłem i zrobiłem automatyczne odświeanie co 5s.

Przy dodaniu aplikacji do obserwowanych, za kadym razem są pobierane wszystkie details, co jest błędem, którego nie zdąyłem poprawić - wyświetlałbym w gridzie dane na podstawie subscribedIds, jednorazowo je zaciągał przy dodaniu do obserwowanych i usunął wywołanie fetchSubscribedDetails poza setInterval z useEffecta.

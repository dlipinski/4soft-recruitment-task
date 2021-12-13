Trochę się zapędziłem i zrobiłem automatyczne odświeanie co 5s.

Przy dodaniu aplikacji do obserwowanych, za kadym razem są pobierane wszystkie details, co jest błędem, którego nie zdąyłem poprawić - wyświetlałbym w gridzie dane na podstawie subscribedIds, przy dodaniu do obserwowanych jednorazowo dla danej aplikacji dociągał details, i usunął wywołanie fetchSubscribedDetails poza setInterval z useEffecta.

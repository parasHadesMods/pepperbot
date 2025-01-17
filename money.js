async function earn(chatClient, db, channel, user) {
    const { rows } = await db.query('SELECT money FROM money WHERE user_name = $1', [user]);
    let money = 0;
    if (rows.length > 0) {
        money = rows[0].money;
    }
    money += 1;
    
    chatClient.say(channel, `${user} earns a PepperMoney and now has ${money}!`);
    if (rows.length == 0) {
        await db.query('INSERT INTO money (user_name, money) VALUES($1, $2)', [user, money]);
    } else {
        await db.query('UPDATE money SET money = $1 WHERE user_name = $2', [money, user]);
    }
}

async function report(chatClient, db, channel, user) {
    const { rows } = await db.query('SELECT money FROM money WHERE user_name = $1', [user]);
    let money = 0;
    if (rows.length > 0) {
        money = rows[0].money;
    }
    
    chatClient.say(channel, `${user} has ${money} PepperMoney`);
}

module.exports = { earn, report };
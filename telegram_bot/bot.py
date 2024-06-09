from telegram import Update
from telegram.ext import Updater, CommandHandler, CallbackContext

# Telegram bot token
BOT_TOKEN = '7151685692:AAGuv36ph3jhmMcb6GgQyCIcb3nH_YD15-M'

def start(update: Update, context: CallbackContext) -> None:
    user = update.effective_user
    update.message.reply_text(f'Hello {user.first_name}! Welcome to the TAPTOAERN Game.')

def main() -> None:
    updater = Updater(BOT_TOKEN)
    dispatcher = updater.dispatcher

    dispatcher.add_handler(CommandHandler("start", start))

    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()
